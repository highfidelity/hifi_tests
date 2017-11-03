//
//  Test.cpp
//  zone/ambientLightInheritence
//
//  Created by Nissim Hadar on 2 Nov 2017.
//  Copyright 2013 High Fidelity, Inc.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//
#include "Test.h"

Test::Test() {
    snapshotFilenameFormat = QRegularExpression("\\d\\d\\d\\d-\\d\\d-\\d\\d_\\d\\d-\\d\\d-\\d\\d.jpg");
    expectedImageFilenameFormat = QRegularExpression("ExpectedImage_\\d+.jpg");
}

void Test::runTest() {
    createListOfAllJPEGimagesInDirectory();

    // Separate images into two lists.  The first is the expected images, the second is the test results
    // Images that are in the wrong format are ignored.
    QStringList expectedImages;
    QStringList resultImages;
    foreach(QString currentFilename, sortedImageFilenames) {
        if (isInExpectedImageFilenameFormat(currentFilename)) {
            expectedImages << currentFilename;
        } else if (isInSnapshotFilenameFormat(currentFilename)) {
            resultImages << currentFilename;
        }
    }

    // The number of images in each list should be identical
    if (expectedImages.length() != resultImages.length()) {
        messageBox.critical(0, 
            "Test failed", 
            "Found " + QString::number(resultImages.length()) + " images in directory" + 
            "\nExpected to find " + QString::number(expectedImages.length()) + " images");

        exit(-1);
    }
}
    
void Test::createTest() {
    // Rename files sequentially, as ExpectedResult_1.jpeg, ExpectedResult_2.jpg and so on
    // Any existing expected result images will be deleted
    createListOfAllJPEGimagesInDirectory();

    int i = 1;
    foreach (QString currentFilename, sortedImageFilenames) {
        QString fullCurrentFilename = pathToImageDirectory + "/" + currentFilename;
        if (isInExpectedImageFilenameFormat(currentFilename)) {
            if (!QFile::remove(fullCurrentFilename)) {
                messageBox.critical(0, "Error", "Could not delete existing file: " + currentFilename + "\nTest creation aborted");
                exit(-1);
            }
        } else if (isInSnapshotFilenameFormat(currentFilename)) {
            QString newFilename = "ExpectedImage_" + QString::number(i) + ".jpg";
            QString fullNewFileName = pathToImageDirectory + "/" + newFilename;

            imageDirectory.rename(fullCurrentFilename, newFilename);
            ++i;
        }
    }
}

void Test::createListOfAllJPEGimagesInDirectory() {
    // get list of JPEG images in folder, sorted by name
    pathToImageDirectory = QFileDialog::getExistingDirectory(nullptr, "Please select folder containing the test images", ".", QFileDialog::ShowDirsOnly);

    imageDirectory = QDir(pathToImageDirectory);
    QStringList nameFilters;
    nameFilters << "*.jpg";

    sortedImageFilenames = imageDirectory.entryList(nameFilters, QDir::Files, QDir::Name);
}

bool Test::isInSnapshotFilenameFormat(QString filename) {
    // Snapshot filename format is hifi-snap-by-<username>-yyyy-MM-dd_hh-mm-ss
    // The filename is checked for adherence to this format for robustness.
    QString leftPart = filename.left(13);
    QString rightPart = filename.right(23);

    return (leftPart == "hifi-snap-by-") && snapshotFilenameFormat.match(rightPart).hasMatch();
}

bool Test::isInExpectedImageFilenameFormat(QString filename) {
    return (expectedImageFilenameFormat.match(filename).hasMatch());
}