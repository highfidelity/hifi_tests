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

#include <QFileDialog>
#include "Test.h"

void Test::createTest() {
    // get list of JPEG images in folder, sorted by name
    QString pathToDir = QFileDialog::getExistingDirectory(nullptr, "Please select folder containing the test images", ".", QFileDialog::ShowDirsOnly);

    QDir dir = QDir(pathToDir);
    QStringList nameFilters;
    nameFilters << "*.jpg";

    QStringList imageFileNames = dir.entryList(nameFilters, QDir::Files, QDir::Name);
}
