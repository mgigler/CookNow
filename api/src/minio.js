"use strict";

var Minio = require('minio')

var minioClient = new Minio.Client({
    endPoint: 'minio',
    port: 9000,
    useSSL: false,
    accessKey: '5a856208fb95d8d447ade4f17da4eb45',
    secretKey: '2ba1304b761d5b4b7440f3b164d5f46a7534f2e3fc3a81cf5198f185a44aa177'
});

function init() {

    minioClient.bucketExists("cooknow", function (error) {
        if (error) {
            return console.log(error);
        }
    });
    const policy = {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": {
                    "AWS": [
                        "*"
                    ]
                },
                "Action": [
                    "s3:GetBucketLocation",
                    "s3:ListBucket"
                ],
                "Resource": [
                    "arn:aws:s3:::cooknow"
                ]
            },
            {
                "Effect": "Allow",
                "Principal": {
                    "AWS": [
                        "*"
                    ]
                },
                "Action": [
                    "s3:GetObject"
                ],
                "Resource": [
                    "arn:aws:s3:::cooknow/*"
                ]
            }
        ]
    }

    minioClient.setBucketPolicy('cooknow', JSON.stringify(policy), function (err) {
        if (err) throw err
    });
    console.log("Connected to Minio cooknow bucket")
}

module.exports.minioClient = minioClient;
module.exports.init = init();