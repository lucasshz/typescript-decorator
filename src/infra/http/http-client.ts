import { HttpClient, HttpRequest, HttpResponse } from '../../core/model/http'

export class HttpClientImpl implements HttpClient {
  async send(request: HttpRequest): Promise<HttpResponse<any>> {
    const { method, headers, data } = request
    const url = request.params ? request.url + '?' + new URLSearchParams(request.params) : request.url
    return fetch(url, { method, headers, body: JSON.stringify(data) })
      .then(async response => ({ statusCode: response.status, data: await response.json() }))
  }
}
