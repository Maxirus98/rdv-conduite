import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import LessonContainer from '../components/LessonContainer';
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
      <IonContent fullscreen={false}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Horaire</IonTitle>
          </IonToolbar>
        </IonHeader>
        <LessonContainer />
        <Scheduler />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
