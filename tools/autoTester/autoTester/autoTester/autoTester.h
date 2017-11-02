#pragma once

#include <QtWidgets/QMainWindow>
#include "ui_autoTester.h"

class autoTester : public QMainWindow
{
    Q_OBJECT

public:
    autoTester(QWidget *parent = Q_NULLPTR);

private:
    Ui::autoTesterClass ui;
};
