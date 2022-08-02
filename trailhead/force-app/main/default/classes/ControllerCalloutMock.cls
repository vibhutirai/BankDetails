@isTest
    global class ControllerCalloutMock implements HttpCalloutMock{
      global HttpResponse respond(HTTPRequest req){
        HttpResponse res = new HttpResponse();
        res.setStatus('OK');
        res.setStatusCode(200);
        res.setBody('SUCCESS');
        return res;
      }
    }