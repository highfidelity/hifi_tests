#pragma once

#include <QDialog>
#include "ui_MismatchWindow.h"

class MismatchWindow : public QDialog, public Ui::MismatchWindow
{
    Q_OBJECT

public:
    MismatchWindow(QWidget *parent = Q_NULLPTR);
    ~MismatchWindow();

    void setExpectedImagePath(QString path);
    void setResultImagePath(QString path);

private:
    QString _expectedImagePath;
    QString _resultImagePath;
};
