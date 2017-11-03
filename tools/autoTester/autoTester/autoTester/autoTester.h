//
//  autoTester.h
//  zone/ambientLightInheritence
//
//  Created by Nissim Hadar on 2 Nov 2017.
//  Copyright 2013 High Fidelity, Inc.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

#ifndef hifi_autoTester_h
#define hifi_autoTester_h

#include <QtWidgets/QMainWindow>
#include "ui_autoTester.h"
#include "Test.h"

class autoTester : public QMainWindow
{
    Q_OBJECT

public:
    autoTester(QWidget *parent = Q_NULLPTR);

private slots:
    void on_runTestButton_clicked();
    void on_createTestButton_clicked();
    void on_closeButton_clicked();

private:
    Ui::autoTesterClass ui;

    Test test;
};

#endif // hifi_autoTester_h