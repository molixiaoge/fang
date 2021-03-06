package com.fang.listener;


import com.fang.init.LoadDictToCacheBean;
import com.fang.init.LoadFuncToCacheBean;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * 
 * @author fang
 * @version 2017年6月22日 下午10:09:10
 */
public class WebContextListener implements ServletContextListener {

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
	
	}

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		WebApplicationContext wac = WebApplicationContextUtils.getWebApplicationContext(sce.getServletContext());  
		//加载字典数据
		LoadDictToCacheBean dictBean = (LoadDictToCacheBean) wac.getBean("loadDictToCacheBean");
		dictBean.init();
		
		//加载功能权限数据
		LoadFuncToCacheBean funcBean = (LoadFuncToCacheBean) wac.getBean("loadFuncToCacheBean");
		funcBean.init();
	}

}
