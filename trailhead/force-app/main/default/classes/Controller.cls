public with sharing class Controller {
    @AuraEnabled(cacheable=true)
    public static String getAndParse() {
        HttpResponse res = new HttpResponse();
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        try {
        req.setEndpoint('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json');
        req.setMethod('GET');
        res = http.send(req);
        System.debug(res.getBody());
        if(res.getStatusCode() == 200) {
            System.debug(res.getBody());
        }
        }catch(Exception e) {
            system.debug('Exception : '+ e);
        }
            return res.getBody();
        }  
    
}
