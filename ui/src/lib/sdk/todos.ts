/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** Serializer for JWT authentication. */
export interface JWT {
  access_token: string;
  refresh_token: string;
  /** User model w/o password */
  user: UserDetails;
}

export interface LoginRequest {
  username?: string;
  /** @format email */
  email?: string;
  /** @minLength 1 */
  password: string;
}

export interface PasswordChangeRequest {
  /**
   * @minLength 1
   * @maxLength 128
   */
  new_password1: string;
  /**
   * @minLength 1
   * @maxLength 128
   */
  new_password2: string;
}

/** Serializer for confirming a password reset attempt. */
export interface PasswordResetConfirmRequest {
  /**
   * @minLength 1
   * @maxLength 128
   */
  new_password1: string;
  /**
   * @minLength 1
   * @maxLength 128
   */
  new_password2: string;
  /** @minLength 1 */
  uid: string;
  /** @minLength 1 */
  token: string;
}

/** Serializer for requesting a password reset e-mail. */
export interface PasswordResetRequest {
  /**
   * @format email
   * @minLength 1
   */
  email: string;
}

export interface PatchedTodoRequest {
  /**
   * @minLength 1
   * @maxLength 200
   */
  title?: string;
  /** @minLength 1 */
  description?: string;
}

/** User model w/o password */
export interface PatchedUserDetailsRequest {
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username?: string;
  /** @maxLength 150 */
  first_name?: string;
  /** @maxLength 150 */
  last_name?: string;
}

export interface RegisterRequest {
  /**
   * @minLength 1
   * @maxLength 150
   */
  username: string;
  /**
   * @format email
   * @minLength 1
   */
  email: string;
  /** @minLength 1 */
  password1: string;
  /** @minLength 1 */
  password2: string;
}

export interface ResendEmailVerificationRequest {
  /**
   * @format email
   * @minLength 1
   */
  email: string;
}

export interface RestAuthDetail {
  detail: string;
}

export interface Todo {
  id: number;
  /** @maxLength 200 */
  title: string;
  description: string;
}

export interface TodoRequest {
  /**
   * @minLength 1
   * @maxLength 200
   */
  title: string;
  /** @minLength 1 */
  description: string;
}

export interface TokenRefresh {
  access: string;
}

export interface TokenRefreshRequest {
  /** @minLength 1 */
  refresh: string;
}

export interface TokenVerifyRequest {
  /** @minLength 1 */
  token: string;
}

/** User model w/o password */
export interface UserDetails {
  /** ID */
  pk: number;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Email address
   * @format email
   */
  email: string;
  /** @maxLength 150 */
  first_name?: string;
  /** @maxLength 150 */
  last_name?: string;
}

/** User model w/o password */
export interface UserDetailsRequest {
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /** @maxLength 150 */
  first_name?: string;
  /** @maxLength 150 */
  last_name?: string;
}

export interface VerifyEmailRequest {
  /** @minLength 1 */
  key: string;
}

import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Todo API
 * @version 1.0.0
 *
 * Todo API
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Check the credentials and return the REST Token if the credentials are valid and authenticated. Calls Django Auth login method to register User ID in Django session framework Accept the following POST parameters: username, password Return the REST Framework Token Object's key.
     *
     * @tags accounts
     * @name AccountsLoginCreate
     * @request POST:/api/v1/accounts/login/
     * @secure
     */
    accountsLoginCreate: (data: LoginRequest, params: RequestParams = {}) =>
      this.request<JWT, any>({
        path: `/api/v1/accounts/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Calls Django logout method and delete the Token object assigned to the current User object. Accepts/Returns nothing.
     *
     * @tags accounts
     * @name AccountsLogoutCreate
     * @request POST:/api/v1/accounts/logout/
     * @secure
     */
    accountsLogoutCreate: (params: RequestParams = {}) =>
      this.request<RestAuthDetail, any>({
        path: `/api/v1/accounts/logout/`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Calls Django Auth SetPasswordForm save method. Accepts the following POST parameters: new_password1, new_password2 Returns the success/fail message.
     *
     * @tags accounts
     * @name AccountsPasswordChangeCreate
     * @request POST:/api/v1/accounts/password/change/
     * @secure
     */
    accountsPasswordChangeCreate: (data: PasswordChangeRequest, params: RequestParams = {}) =>
      this.request<RestAuthDetail, any>({
        path: `/api/v1/accounts/password/change/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Calls Django Auth PasswordResetForm save method. Accepts the following POST parameters: email Returns the success/fail message.
     *
     * @tags accounts
     * @name AccountsPasswordResetCreate
     * @request POST:/api/v1/accounts/password/reset/
     * @secure
     */
    accountsPasswordResetCreate: (data: PasswordResetRequest, params: RequestParams = {}) =>
      this.request<RestAuthDetail, any>({
        path: `/api/v1/accounts/password/reset/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Password reset e-mail link is confirmed, therefore this resets the user's password. Accepts the following POST parameters: token, uid, new_password1, new_password2 Returns the success/fail message.
     *
     * @tags accounts
     * @name AccountsPasswordResetConfirmCreate
     * @request POST:/api/v1/accounts/password/reset/confirm/
     * @secure
     */
    accountsPasswordResetConfirmCreate: (data: PasswordResetConfirmRequest, params: RequestParams = {}) =>
      this.request<RestAuthDetail, any>({
        path: `/api/v1/accounts/password/reset/confirm/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags accounts
     * @name AccountsRegistrationCreate
     * @request POST:/api/v1/accounts/registration/
     * @secure
     */
    accountsRegistrationCreate: (data: RegisterRequest, params: RequestParams = {}) =>
      this.request<JWT, any>({
        path: `/api/v1/accounts/registration/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags accounts
     * @name AccountsRegistrationResendEmailCreate
     * @request POST:/api/v1/accounts/registration/resend-email/
     * @secure
     */
    accountsRegistrationResendEmailCreate: (data: ResendEmailVerificationRequest, params: RequestParams = {}) =>
      this.request<RestAuthDetail, any>({
        path: `/api/v1/accounts/registration/resend-email/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags accounts
     * @name AccountsRegistrationVerifyEmailCreate
     * @request POST:/api/v1/accounts/registration/verify-email/
     * @secure
     */
    accountsRegistrationVerifyEmailCreate: (data: VerifyEmailRequest, params: RequestParams = {}) =>
      this.request<RestAuthDetail, any>({
        path: `/api/v1/accounts/registration/verify-email/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Takes a refresh type JSON web token and returns an access type JSON web token if the refresh token is valid.
     *
     * @tags accounts
     * @name AccountsTokenRefreshCreate
     * @request POST:/api/v1/accounts/token/refresh/
     */
    accountsTokenRefreshCreate: (data: TokenRefreshRequest, params: RequestParams = {}) =>
      this.request<TokenRefresh, any>({
        path: `/api/v1/accounts/token/refresh/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Takes a token and indicates if it is valid.  This view provides no information about a token's fitness for a particular use.
     *
     * @tags accounts
     * @name AccountsTokenVerifyCreate
     * @request POST:/api/v1/accounts/token/verify/
     */
    accountsTokenVerifyCreate: (data: TokenVerifyRequest, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/accounts/token/verify/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Reads and updates UserModel fields Accepts GET, PUT, PATCH methods. Default accepted fields: username, first_name, last_name Default display fields: pk, username, email, first_name, last_name Read-only fields: pk, email Returns UserModel fields.
     *
     * @tags accounts
     * @name AccountsUserRetrieve
     * @request GET:/api/v1/accounts/user/
     * @secure
     */
    accountsUserRetrieve: (params: RequestParams = {}) =>
      this.request<UserDetails, any>({
        path: `/api/v1/accounts/user/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Reads and updates UserModel fields Accepts GET, PUT, PATCH methods. Default accepted fields: username, first_name, last_name Default display fields: pk, username, email, first_name, last_name Read-only fields: pk, email Returns UserModel fields.
     *
     * @tags accounts
     * @name AccountsUserUpdate
     * @request PUT:/api/v1/accounts/user/
     * @secure
     */
    accountsUserUpdate: (data: UserDetailsRequest, params: RequestParams = {}) =>
      this.request<UserDetails, any>({
        path: `/api/v1/accounts/user/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Reads and updates UserModel fields Accepts GET, PUT, PATCH methods. Default accepted fields: username, first_name, last_name Default display fields: pk, username, email, first_name, last_name Read-only fields: pk, email Returns UserModel fields.
     *
     * @tags accounts
     * @name AccountsUserPartialUpdate
     * @request PATCH:/api/v1/accounts/user/
     * @secure
     */
    accountsUserPartialUpdate: (data: PatchedUserDetailsRequest, params: RequestParams = {}) =>
      this.request<UserDetails, any>({
        path: `/api/v1/accounts/user/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags todos
     * @name TodosList
     * @request GET:/api/v1/todos/
     * @secure
     */
    todosList: (params: RequestParams = {}) =>
      this.request<Todo[], any>({
        path: `/api/v1/todos/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags todos
     * @name TodosCreate
     * @request POST:/api/v1/todos/
     * @secure
     */
    todosCreate: (data: TodoRequest, params: RequestParams = {}) =>
      this.request<Todo, any>({
        path: `/api/v1/todos/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags todos
     * @name TodosRetrieve
     * @request GET:/api/v1/todos/{id}/
     * @secure
     */
    todosRetrieve: (id: number, params: RequestParams = {}) =>
      this.request<Todo, any>({
        path: `/api/v1/todos/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags todos
     * @name TodosUpdate
     * @request PUT:/api/v1/todos/{id}/
     * @secure
     */
    todosUpdate: (id: number, data: TodoRequest, params: RequestParams = {}) =>
      this.request<Todo, any>({
        path: `/api/v1/todos/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags todos
     * @name TodosPartialUpdate
     * @request PATCH:/api/v1/todos/{id}/
     * @secure
     */
    todosPartialUpdate: (id: number, data: PatchedTodoRequest, params: RequestParams = {}) =>
      this.request<Todo, any>({
        path: `/api/v1/todos/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags todos
     * @name TodosDestroy
     * @request DELETE:/api/v1/todos/{id}/
     * @secure
     */
    todosDestroy: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/todos/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
