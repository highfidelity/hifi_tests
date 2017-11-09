#include "MismatchWindow.h"

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
void MismatchWindow::setExpectedImagePath(QString path) {
    _expectedImagePath = path; 

    QPixmap pixMap(_expectedImagePath);
    expectedImageLabel->setPixmap(pixMap);
 }

void MismatchWindow::setResultImagePath(QString path) {
    _resultImagePath = path; 

    QPixmap pixMap(_resultImagePath);
    resultImageLabel->setPixmap(pixMap);
}
