import React, { useEffect, useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonText, IonTextarea, IonToast } from '@ionic/react';
import './Login.scss';
import { connect } from '../data/connect';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

interface OwnProps { }

interface DispatchProps { }

interface SupportProps extends OwnProps, DispatchProps { }

const Support: React.FC<SupportProps> = () => {
  const [result1, setResult1] = useState('');
  const [scanActive, setScanActive] = useState(false);
  useEffect(() => {
    BarcodeScanner.prepare();
    return () => {
      BarcodeScanner.stopScan();
    }
  }, []);
  const startScanner = async () => {
    const allowed = await checkPermission();
    if (allowed) {
      setScanActive(true);
      const result = await BarcodeScanner.startScan();
      console.log("file:  ", result);
      if (result.hasContent) {
        let rs = result.content as string;
        setResult1(rs);
        setScanActive(false);
      }
    }
  }
  const stopScanner = () => {
    BarcodeScanner.stopScan();
    setScanActive(false);
  }
  const checkPermission = async () => {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true })
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      } else {
        resolve(false);
      }
    })
  }
  return (
    <IonPage id="support-page">
      <IonButton expand="full" onClick={startScanner}>Start Scan</IonButton>
      <IonTitle>{result1}</IonTitle>
    </IonPage>
  );




  // const [message, setMessage] = useState('');
  // const [formSubmitted, setFormSubmitted] = useState(false);
  // const [messageError, setMessageError] = useState(false);
  // const [showToast, setShowToast] = useState(false);

  // const send = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setFormSubmitted(true);
  //   if (!message) {
  //     setMessageError(true);
  //   }
  //   if (message) {
  //     setMessage('');
  //     setShowToast(true);
  //   }
  // };

  // return (
  //   <IonPage id="support-page">
  //     <IonHeader>
  //       <IonToolbar>
  //         <IonButtons slot="start">
  //           <IonMenuButton></IonMenuButton>
  //         </IonButtons>
  //         <IonTitle>Support xin chao</IonTitle>
  //       </IonToolbar>
  //     </IonHeader>
  //     <IonContent>

  //       <div className="login-logo">
  //         <img src="assets/img/appicon.svg" alt="Ionic logo" />
  //       </div>

  //       <form noValidate onSubmit={send}>
  //         <IonList>
  //           <IonItem>
  //             <IonLabel position="stacked" color="primary">Enter your support message below</IonLabel>
  //             <IonTextarea name="message" value={message} spellCheck={false} autocapitalize="off" rows={6} onIonChange={e => setMessage(e.detail.value!)}
  //               required>
  //             </IonTextarea>
  //           </IonItem>

  //           {formSubmitted && messageError && <IonText color="danger">
  //             <p className="ion-padding-start">
  //               Support message is required
  //             </p>
  //           </IonText>}
  //         </IonList>

  //         <IonRow>
  //           <IonCol>
  //             <IonButton type="submit" expand="block">Submit</IonButton>
  //           </IonCol>
  //         </IonRow>
  //       </form>

  //     </IonContent>

  //     <IonToast
  //       isOpen={showToast}
  //       duration={3000}
  //       message="Your support request has been sent"
  //       onDidDismiss={() => setShowToast(false)} />
  //   </IonPage>
  // );
};

export default connect<OwnProps, {}, DispatchProps>({
  component: Support
})