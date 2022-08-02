@isTest
public class ControllerTest{
    static testMethod void creditTestMethod(){
        Test.startTest();
        Test.setMock(HttpCalloutMock.class, new ControllerCalloutMock());
        Map<String, String> creditMap = new Map<String, String>();
        creditMap.put('creditorName', 'CBNA');
        creditMap.put('firstName', 'Suman');
        creditMap.put('lastName', 'Tester79');
        creditMap.put('minPaymentPercentagetName', '2.00');
        creditMap.put('balance', '993.00');
        Controller.getAndParse();
        Test.stopTest();
    }
}