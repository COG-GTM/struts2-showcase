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

public class CsrfAction extends ActionSupport {

    private static final long serialVersionUID = 1L;
    private String token;

    public String execute() throws Exception {
        SessionMap session = (SessionMap) ActionContext.getContext().get(ActionContext.SESSION);
        
        String csrfToken = (String) session.get("struts.token.name");
        if (csrfToken == null) {
            csrfToken = java.util.UUID.randomUUID().toString();
            session.put("struts.token.name", csrfToken);
        }
        
        this.token = csrfToken;
        return SUCCESS;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
