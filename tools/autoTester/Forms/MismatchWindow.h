#pragma once

#include <QDialog>
#include "ui_MismatchWindow.h"

class MismatchWindow : public QDialog, public Ui::MismatchWindow
{
    Q_OBJECT

public:
    MismatchWindow(QWidget *parent = Q_NULLPTR);
    ~MismatchWindow();

    void setExpectedImagePath(QString path) { _expectedImagePath = path; }
    void setResultImagePath(QString path) { _resultImagePath = path; }

private:
    QString _expectedImagePath;
    QString _resultImagePath;
};
