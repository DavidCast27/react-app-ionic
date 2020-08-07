import React from "react";
import { IonHeader, IonTitle, IonToolbar } from '@ionic/react';

const Header: React.FC = () => {
  return (
    <IonHeader>
    <IonToolbar>
      <IonTitle>React app header</IonTitle>
    </IonToolbar>
  </IonHeader>
  );
};

export default Header;
