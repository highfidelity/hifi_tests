//
//  Test.h
//  zone/ambientLightInheritence
//
//  Created by Nissim Hadar on 2 Nov 2017.
//  Copyright 2013 High Fidelity, Inc.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

#ifndef hifi_test_h
#define hifi_test_h

#include <QFileDialog>

class Test {
public: 
    Test();

    void runTest();
    void createTest();

    void createListOfAllJPEGimagesInDirectory();

    bool isInSnapshotFilenameFormat(QString filename);
    bool isInExpectedImageFilenameFormat(QString filename);

private:
    QString pathToImageDirectory;
    QDir imageDirectory;
    QStringList sortedImageFilenames;

    QRegularExpression snapshotFilenameFormat;
    QRegularExpression expectedImageFilenameFormat;
};

#endif // hifi_test_h
