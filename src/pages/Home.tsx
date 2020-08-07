import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonList,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonText,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { v4 as uuidv4 } from "uuid";
import Header from "../components/Header";
import Footer from "../components/Footer";

import SimpleModal from "../components/SimpleModal";

import { DummyData } from "../services/dummy-data";
import "./Home.css";

const Home: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [itemsArray, setItemsArray] = useState<any[]>([]);

  const [isEditing, setIsEditing] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({});

  useEffect(() => {
    setItemsArray(DummyData);
  }, []);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const addToList = (item: any) => {
    const tempList = [...itemsArray];
    const newIndex = uuidv4();
    item.id = newIndex;
    console.log(item);
    tempList.push(item);
    setItemsArray(tempList);
  };
  const removeToList = (id: number) => {
    const tempList = [...itemsArray];
    const itemIndex = itemsArray.findIndex((item: any) => item.id === id);
    tempList.splice(itemIndex, 1);
    setItemsArray(tempList);
  };

  const editFromList = (item: any) => {
    const tempList = [...itemsArray];
    const itemIndex = itemsArray.findIndex((element) => element.id === item.id);
    tempList[itemIndex] = { ...item };
    setItemsArray(tempList);
    setItemToEdit({});
    setIsEditing(false);
    handleClose();
  };

  const getItemToEdit = (id: any) => {
    const itemIndex = itemsArray.find((item: any) => item.id === id);
    const tempItem = { ...itemIndex };
    setItemToEdit(tempItem);
    setIsEditing(true);
    handleOpen();
  };

  return (
    <IonPage>
      <Header />
      <IonContent>
        <IonList>
          {itemsArray.map((item: any) => {
            return (
              <IonItemSliding key={item.id}>
                <IonItem>
                  <IonLabel>
                    <IonText color="primary">{item.name}</IonText>
                    <p>{item.description}</p>
                  </IonLabel>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption onClick={() => getItemToEdit(item.id)}>
                    Edit
                  </IonItemOption>
                  <IonItemOption
                    onClick={() => removeToList(item.id)}
                    color="secondary"
                  >
                    Delete
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            );
          })}
        </IonList>
      </IonContent>
      <SimpleModal
        addToList={addToList}
        editFromList={editFromList}
        toogleModal={setOpenModal}
        isOpen={openModal}
        handleClose={handleClose}
        isEditing={isEditing}
        itemToEdit={itemToEdit}
      />
      <IonFab
        onClick={() => handleOpen()}
        vertical="bottom"
        horizontal="end"
        slot="fixed"
      >
        <IonFabButton>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
      <Footer />
    </IonPage>
  );
};

export default Home;
