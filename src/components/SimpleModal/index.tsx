import React, { useState, useEffect } from "react";
import "./SimpleModal.css";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonModal,
} from "@ionic/react";

interface SimpleModalProps {
    toogleModal:any;
    isOpen: boolean;
    addToList: any;
    editFromList:any;
    handleClose:any;
    isEditing:boolean;
    itemToEdit:any;
}

const SimpleModal: React.FC<SimpleModalProps> = (props: any) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors]:any = useState({});

  useEffect(() => {
    if (props.isEditing) {
      setName(props.itemToEdit.name);
      setDescription(props.itemToEdit.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [props.isEditing, props.itemToEdit]);

  const save = () => {
      console.log(name, description)
    if (name.length < 4) {
      setErrors({ message: "Name must be at least 4 characters." });
    } else if (description.length < 4) {
      setErrors({ message: "Description must be at least 4 characters." });
    } else {
      const newItem:any = {
        name,
        description,
        status: "done",
      };
      if(props.isEditing){
         newItem.id = props.itemToEdit.id;
        props.editFromList(newItem)
      }else{
        props.addToList(newItem);
      }
      props.handleClose();
      setErrors({});
    }
    return;
  };

  return (
    <IonModal isOpen={props.isOpen} onDidDismiss={props.handleClose}>
      <form>
        <div className="alert-message">{errors && errors.message}</div>
        <IonItem>
          <IonLabel position="floating">Name</IonLabel>
          <IonInput
            id="name"
            name="name"
            value={name}
            onIonChange={(e: any) => setName(e.target.value)}
          />
          <IonLabel position="floating">Description</IonLabel>
          <IonTextarea
            id="description"
            name="description"
            value={description}
            onIonChange={(e: any) => setDescription(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonButton onClick={() => save()} color="primary">
            Save
          </IonButton>
          <IonButton onClick={() => props.toogleModal(false)}>Cancel</IonButton>
        </IonItem>
      </form>
    </IonModal>
  );
};

export default SimpleModal;
