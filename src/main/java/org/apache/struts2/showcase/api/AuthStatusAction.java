/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package org.apache.struts2.showcase.api;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import org.apache.struts2.dispatcher.SessionMap;
import org.apache.struts2.showcase.chat.ChatAuthenticationInterceptor;
import org.apache.struts2.showcase.chat.User;

public class AuthStatusAction extends ActionSupport {

    private static final long serialVersionUID = 1L;
    private String name;
    private boolean authenticated;

    public String execute() throws Exception {
        SessionMap session = (SessionMap) ActionContext.getContext().get(ActionContext.SESSION);
        User user = (User) session.get(ChatAuthenticationInterceptor.USER_SESSION_KEY);
        
        if (user != null) {
            this.name = user.getName();
            this.authenticated = true;
        } else {
            this.name = null;
            this.authenticated = false;
        }
        
        return SUCCESS;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isAuthenticated() {
        return authenticated;
    }

    public void setAuthenticated(boolean authenticated) {
        this.authenticated = authenticated;
    }
}
