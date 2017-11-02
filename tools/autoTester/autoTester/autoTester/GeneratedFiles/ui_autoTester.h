/********************************************************************************
** Form generated from reading UI file 'autoTester.ui'
**
** Created by: Qt User Interface Compiler version 5.9.2
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_AUTOTESTER_H
#define UI_AUTOTESTER_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QMenuBar>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QStatusBar>
#include <QtWidgets/QToolBar>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_autoTesterClass
{
public:
    QWidget *centralWidget;
    QPushButton *closeButton;
    QPushButton *createTestButton;
    QMenuBar *menuBar;
    QToolBar *mainToolBar;
    QStatusBar *statusBar;

    void setupUi(QMainWindow *autoTesterClass)
    {
        if (autoTesterClass->objectName().isEmpty())
            autoTesterClass->setObjectName(QStringLiteral("autoTesterClass"));
        autoTesterClass->resize(600, 400);
        centralWidget = new QWidget(autoTesterClass);
        centralWidget->setObjectName(QStringLiteral("centralWidget"));
        closeButton = new QPushButton(centralWidget);
        closeButton->setObjectName(QStringLiteral("closeButton"));
        closeButton->setGeometry(QRect(500, 300, 75, 23));
        createTestButton = new QPushButton(centralWidget);
        createTestButton->setObjectName(QStringLiteral("createTestButton"));
        createTestButton->setGeometry(QRect(10, 10, 75, 23));
        autoTesterClass->setCentralWidget(centralWidget);
        menuBar = new QMenuBar(autoTesterClass);
        menuBar->setObjectName(QStringLiteral("menuBar"));
        menuBar->setGeometry(QRect(0, 0, 600, 21));
        autoTesterClass->setMenuBar(menuBar);
        mainToolBar = new QToolBar(autoTesterClass);
        mainToolBar->setObjectName(QStringLiteral("mainToolBar"));
        autoTesterClass->addToolBar(Qt::TopToolBarArea, mainToolBar);
        statusBar = new QStatusBar(autoTesterClass);
        statusBar->setObjectName(QStringLiteral("statusBar"));
        autoTesterClass->setStatusBar(statusBar);

        retranslateUi(autoTesterClass);

        QMetaObject::connectSlotsByName(autoTesterClass);
    } // setupUi

    void retranslateUi(QMainWindow *autoTesterClass)
    {
        autoTesterClass->setWindowTitle(QApplication::translate("autoTesterClass", "autoTester", Q_NULLPTR));
        closeButton->setText(QApplication::translate("autoTesterClass", "Close", Q_NULLPTR));
        createTestButton->setText(QApplication::translate("autoTesterClass", "Create Test", Q_NULLPTR));
    } // retranslateUi

};

namespace Ui {
    class autoTesterClass: public Ui_autoTesterClass {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_AUTOTESTER_H
