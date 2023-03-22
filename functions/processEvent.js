module.exports.handler = async (event) => {
  let records = event.Records;
  let batchItemFailures = [];

  if (records.length) {
    for (const record of records) {
      try {
        const parsedBody = JSON.parse(record.body);
        console.log(parsedBody);

        if (typeof parsedBody.details.vehicleNo != "string") {
          throw new Error("Vehicle Number Must be a String");
        }

        console.log(
          "processing vehicle details " + parsedBody.details.vehicleNo
        );
        console.log("processing is successful " + record.messageId);
      } catch (err) {
        batchItemFailures.push({ itemIdentifier: record.messageId });
      }
    }
  }
  return { batchItemFailures };
};
