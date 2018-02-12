package au.com.woolworths.portal.aspect;

import java.util.Arrays;

import org.apache.log4j.Logger;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.MDC;

/**
 * 
 * @author xsvm1
 * @name Saravanakumar Venkatachalam
 *
 */

@Aspect
public class LoggingAspect {
	private static final Logger logger = Logger.getLogger(LoggingAspect.class
			.getName());

	@Pointcut("execution( * au.com.woolworths.portal.controller.*.*(..)) || execution( * au.com.woolworths.portal.service.*.*(..)) || execution( * au.com.woolworths.portal.pos.controller.*.*(..))&& !execution( * au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil.*(..)) || execution( * au.com.woolworths.portal.pos.service.*.*(..)) ")
	private void anyOperationInControllerPackage() {
		/*
		 * nothing to do here; this just defines that we want to catch all
		 * methods in the controller and service -packages
		 */
	}

	@Around("anyOperationInControllerPackage()")
	public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {

		
		logger.info("Entering "
				+ joinPoint.getSignature().getDeclaringTypeName() + "#"
				+ joinPoint.getSignature().getName() + "() using arguments: "
				+ Arrays.toString(joinPoint.getArgs())+" , By user : "+MDC.get("USER_NAME")+" , with Session id : " + MDC.get("SESSION_ID"));
		try {
			Object result = joinPoint.proceed();

			logger.info("Leaving "
					+ joinPoint.getSignature().getDeclaringTypeName() + "#"
					+ joinPoint.getSignature().getName()+ "() using arguments: "
							+ Arrays.toString(joinPoint.getArgs())+" , By user : "+MDC.get("USER_NAME")+" , with Session id : " + MDC.get("SESSION_ID"));
			return result;
		} catch (Throwable ex) {
			logger.error("Exception at AOP ", ex);
			throw ex;
		}
	}
}
