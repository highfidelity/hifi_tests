//
//  MismatchWindow.cpp
//
//  Created by Nissim Hadar on 9 Nov 2017.
//  Copyright 2013 High Fidelity, Inc.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//
#include "MismatchWindow.h"

#include <QFileInfo>

MismatchWindow::MismatchWindow(QWidget *parent)
    : QDialog(parent)
{
    setupUi(this);

    expectedImage->setScaledContents(true);
    resultImage->setScaledContents(true);
}

void MismatchWindow::setError(float error)
{
    errorLabel->setText("Error: " + QString::number((int)error));
}

void MismatchWindow::setPathAndExpectedImage(QString path) {
    expectedFilename->setText(QFileInfo(path.toStdString().c_str()).fileName());

    expectedImage->setPixmap(QPixmap(path));

    imagePath->setText("Path to test: " + path.left(path.lastIndexOf("/")));
 }

void MismatchWindow::setResultImage(QString path) {
    resultFilename->setText(QFileInfo(path.toStdString().c_str()).fileName());

    resultImage->setPixmap(QPixmap(path));
}

void MismatchWindow::on_passTestButton_clicked()
{
    _userResponse = USER_RESPONSE_PASS;
}

void MismatchWindow::on_failTestButton_clicked()
{
    _userResponse = USE_RESPONSE_FAIL;
}

void MismatchWindow::on_abortTestsButton_clicked()
{
    _userResponse = USER_RESPONSE_ABORT;
}
