public with sharing class MetaDataChangesClass {
    public MetaDataChangesClass() {

    }

    @AuraEnabled(cacheable=true)
    public static List<ApexClass> getApexClassChanges(){
        return [
            SELECT
                Name, LastModifiedDate, LastModifiedById, LastModifiedBy.Name
            FROM
                ApexClass
            ORDER BY
                Lastmodifieddate desc
            LIMIT 100];
    }
    @AuraEnabled(cacheable=true)
    public static List<ApexTrigger> getApexTriggerChanges(){
        return [
            SELECT
                Name, LastModifiedDate, LastModifiedById, LastModifiedBy.Name
            FROM
                ApexTrigger
            ORDER BY
                Lastmodifieddate desc
            LIMIT 100];
    }
    @AuraEnabled(cacheable=true)
    public static List<AuraDefinitionBundle> getLightningComponentChanges(){
        return [
            SELECT
                DeveloperName, LastModifiedDate, LastModifiedById, LastModifiedBy.Name
            FROM
                AuraDefinitionBundle
            ORDER BY
                Lastmodifieddate desc
            LIMIT 100];
    }
    @AuraEnabled(cacheable=true)
    public static VOID getLWCChanges(){
        //THIS DOES NOT CURRENTLY WORK IN SALESFORCE APEX AND AWAITING UPDATE
        /*return [
            SELECT DeveloperName, LastModifiedDate, LastModifiedById
            FROM
                LightningComponentBundle
            ORDER BY
                Lastmodifieddate desc];*/
    }
}
