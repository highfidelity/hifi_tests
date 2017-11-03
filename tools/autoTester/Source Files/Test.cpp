//
//  test.cpp
//  zone/ambientLightInheritence
//
//  Created by Nissim Hadar on 2 Nov 2017.
//  Copyright 2013 High Fidelity, Inc.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//
#include <QRegularExpression>

#include "Test.h"

Test::Test() {
    snapshotFilenameFormat = QRegularExpression("\\d\\d\\d\\d-\\d\\d-\\d\\d_\\d\\d-\\d\\d-\\d\\d.jpg");
}

void Test::runTest() {
    createListOfJPEGimagesInDirectory();

    // Separate images into two lists.  The first is the expected images, the second is the test results
    QStringList expectedImages;
    QStringList resultImages;
    foreach(QString currentFilename, sortedImageFilenames) {
    }
}
    
void Test::createTest() {
    createListOfJPEGimagesInDirectory();

    // Rename files sequentially, as ExpectedResult_1.jpeg, ExpectedResult_2.jpg and so on
    int i = 1;
    foreach (QString currentFilename, sortedImageFilenames) {
        // Snapshot filename format is hifi-snap-by-<username>-yyyy-MM-dd_hh-mm-ss
        // The filename is checked for adherence to this format for robustness.
        QString leftPart = currentFilename.left(13);
        QString rightPart = currentFilename.right(23);

        if ((leftPart == "hifi-snap-by-") && snapshotFilenameFormat.match(rightPart).hasMatch()) {
            QString fullFilename = pathToImageDirectory + "/" + currentFilename;
            QString newFilename = "ExpectedImage_" + QString::number(i) + ".jpg";

            imageDirectory.rename(fullFilename, newFilename);
            ++i;
        }
    }
}

void Test::createListOfJPEGimagesInDirectory() {
    // get list of JPEG images in folder, sorted by name
    pathToImageDirectory = QFileDialog::getExistingDirectory(nullptr, "Please select folder containing the test images", ".", QFileDialog::ShowDirsOnly);

    imageDirectory = QDir(pathToImageDirectory);
    QStringList nameFilters;
    nameFilters << "*.jpg";

    sortedImageFilenames = imageDirectory.entryList(nameFilters, QDir::Files, QDir::Name);
}