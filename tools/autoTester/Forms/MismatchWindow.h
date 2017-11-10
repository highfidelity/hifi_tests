#pragma once

#include <QDialog>
#include "ui_MismatchWindow.h"

class MismatchWindow : public QDialog, public Ui::MismatchWindow
{
    Q_OBJECT

public:
    MismatchWindow(QWidget *parent = Q_NULLPTR);
    ~MismatchWindow();

    void setPathAndExpectedImage(QString path);
    void setResultImage(QString path);
};
