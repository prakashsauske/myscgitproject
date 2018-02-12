package au.com.woolworths.portal.util;

import java.lang.reflect.Method;
import java.util.concurrent.Callable;

import org.apache.log4j.Logger;
/**
 * @author xsvm1
 * 
 */

public class CallableTask<T> implements Callable<T> {
    String taskName ;
    Class<?> parameterTypes[];
    Object parameterObject[];
    Object targetObj;
	private static final Logger LOGGER = Logger
			.getLogger(CallableTask.class.getName());
    
    public CallableTask(String name, Object targetObj, Class<?> parameterTypes[], Object parameterObject[] ){
        taskName = name;
        this.parameterTypes = (parameterTypes==null?new Class[0]:parameterTypes);
        this.parameterObject = (parameterObject==null?new Object[0]:parameterObject);
        this.targetObj = targetObj;
    }
    @Override
    public String toString() {
    	return taskName;
    }

	@SuppressWarnings("unchecked")
	public T call() throws Exception {
    	LOGGER.info("Task Name : "+taskName);
        Method  method = targetObj.getClass().getMethod(taskName, parameterTypes);
        Object obj = method.invoke(targetObj, parameterObject);
    	return obj==null?null:(T)obj;
    }
}
