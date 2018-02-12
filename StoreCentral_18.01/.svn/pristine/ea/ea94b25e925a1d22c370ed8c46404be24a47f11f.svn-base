package au.com.woolworths.portal.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;

import org.apache.log4j.Logger;

/**
 * 
 * @author xsvm1
 * @name Saravanakumar Venkatachalam
 *
 */
public class CacheManagerUtil {
	private static CacheManagerUtil instance = null;
	
	private CacheManager manager;

	private static final Logger LOGGER = Logger
	.getLogger(CacheManagerUtil.class.getName());
	
	protected CacheManagerUtil() {
	}

	protected CacheManagerUtil(CacheManager manager) {
		this.setManager(manager);
	}
 
	// Lazy Initialization (If required then only)
	public static CacheManagerUtil getInstance() {
		if (instance == null) {
			// Thread Safe. Might be costly operation in some case
			synchronized (CacheManagerUtil.class) {

				//CacheManager manager = CacheManager.newInstance("ehcache.xml");
				CacheManager manager = CacheManager.newInstance(CacheManagerUtil.class.getResource("/ehcache.xml"));
				if (instance == null) {
					instance = new CacheManagerUtil(manager);
					/*Connection con = LoginDao.getConnection();
					PreparedStatement stmt;
					try {
						stmt = con
								.prepareStatement(" select 57535 Version from dual ");
						ResultSet rs = stmt.executeQuery();
						if(rs.next()) {
							String version = rs.getString("Version");
							instance.setJsCssCacheVersion(version);
							LOGGER.info("Version------- : "+version);
						}
					} catch (SQLException e) {
						LOGGER.error("Error while retriving the cach version!!!", e);
					}*/
				}
			}
		}
		return instance;
	}
	public static void initialize() {
		getInstance();
	}

	public CacheManager getManager() {
		return manager;
	}

	public void setManager(CacheManager manager) {
		this.manager = manager;
	}
	@SuppressWarnings("unchecked")
	public <T> void put(String sessionId, Class<T> clz, List<?> list) {
		Cache cache = manager.getCache("1posCache");
		Map<String, List<?>> map = null;
		Element element = cache.get(sessionId);
		if(element==null) {
			map = new HashMap<String, List<?>>();
		}
		else {
			Object obj = element.getObjectValue();
			if(obj != null) {
				map = (Map<String, List<?>>) obj;
			}
			else {
				LOGGER.error("Something is store for this user session, It should not happen, debug and resolve this scenario "+sessionId);
				map = new HashMap<String, List<?>>();
			}
		}
		map.put(clz.getName(), list);
		element = new Element(sessionId, map);
		cache.put(element);
	}
	@SuppressWarnings("unchecked")
	public <T> List<T> get(String sessionId, Class<T> clz) {
		Cache cache = manager.getCache("1posCache");
		Element element = cache.get(sessionId);
		List<T> list = null;
		if(element!=null) {
			Object obj = element.getObjectValue();
			if(obj != null) {
				Map<String, List<?>> map = (Map<String, List<?>>) obj;
				list = (List<T>) map.get(clz.getName());
				if(list!=null && list.size()>0) {
					Object o = list.get(0);
					if(clz != o.getClass()) {
						LOGGER.info("Looks like invlid cache data, should attempt to hit service");
						list = null;
					}
					else {
						LOGGER.info("Valid cache data, Service call avoided BOOM!!!!...................");
					}
				}
				else {
					LOGGER.info("No Data from Cache, should attempt to hit service");
				}
			}
		}
		return list;
	}
	public boolean remove(String sessionId) {
		Cache cache = manager.getCache("1posCache");
		return cache.remove(sessionId);
	}
}
