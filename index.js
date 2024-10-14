const { fromSSO } = require('@aws-sdk/credential-provider-sso');
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');

const sendSMS = async () => {

    try {
        const credentials = await fromSSO({ profile: 'AWSAdministratorAccess-012345678912'})();
        console.info(credentials)
        const client = new SNSClient({ region: 'eu-west-1', credentials });
        console.info(client)
        await client.send(
            new PublishCommand({
                Subject: 'AMAG Test SMS',
                Message: 'SNS works OK. Regards, Filippo',
                PhoneNumber: '+41792867554',
                MessageAttributes: {
                    'AWS.SNS.SMS.SenderID' : {
                        DataType: 'String',
                        StringValue: 'TEST',
                    }
                },
            }),
        )
    } catch (error) {
        console.error(error)
    }

}

sendSMS()