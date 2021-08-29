import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Scheduler from '../components/Scheduler';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Grille des rendez-vous</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Horaire</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Scheduler />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
