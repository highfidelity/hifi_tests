#include "MismatchWindow.h"

#include <QFileInfo>

MismatchWindow::MismatchWindow(QWidget *parent)
    : QDialog(parent)
{
    setupUi(this);

    expectedImageLabel->setScaledContents(true);
    resultImageLabel->setScaledContents(true);
}

MismatchWindow::~MismatchWindow()
{
}
void MismatchWindow::setPathAndExpectedImage(QString path) {
    expectedTextLabel->setText(QFileInfo(path.toStdString().c_str()).fileName());

    QPixmap pixMap(path);
    expectedImageLabel->setPixmap(pixMap);

    imagePath->setText(path.left(path.lastIndexOf("/")));
 }

void MismatchWindow::setResultImage(QString path) {
    resultTextLabel->setText(QFileInfo(path.toStdString().c_str()).fileName());

    QPixmap pixMap(path);
    resultImageLabel->setPixmap(pixMap);
}
