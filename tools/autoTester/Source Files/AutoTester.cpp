//
//  autoTester.cpp
//  zone/ambientLightInheritence
//
//  Created by Nissim Hadar on 2 Nov 2017.
//  Copyright 2013 High Fidelity, Inc.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//
#include "AutoTester.h"

AutoTester::AutoTester(QWidget *parent)
    : QMainWindow(parent)
{
    ui.setupUi(this);
}

void AutoTester::on_closeButton_clicked()
{
    exit(0);
}

void AutoTester::on_runTestButton_clicked()
{
    test.runTest();
}

void AutoTester::on_createTestButton_clicked()
{
    test.createTest();
}
