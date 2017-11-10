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
