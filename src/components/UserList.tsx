import { IonFab, IonFabButton, IonIcon, IonItem, IonList, IonSearchbar } from '@ionic/react';
import { personAdd } from 'ionicons/icons';
import React, { Component } from 'react';
import { ISharedProps } from './ISharedProps';
import { IUser } from '../models/IUser';

interface IUserListProps extends ISharedProps {
    users: IUser[];
}
interface IUserListState {
    searchText: string;

}
export class UserList extends Component<IUserListProps, IUserListState> {
    private allUsers: IUser[];
    constructor(props: IUserListProps) {
        super(props);

        this.state = {
            searchText: null
        };
    }

    public render(): JSX.Element {
        const { users } = this.props;
        const { searchText } = this.state;
        return (
            <>
                <IonSearchbar value={searchText} onIonChange={(e) => { this.setState({ searchText: e.detail.value! }) }} />
                <IonList>
                    {users.map((user, key) => {
                        var nameAsArray = user.fullName ? Array.from(user.fullName) : null;
                        console.log("nameAsArray", nameAsArray);
                        if (nameAsArray && searchText == null || searchText == "" || nameAsArray.includes(searchText))
                            return <IonItem key={key}>{user.fullName}</IonItem>
                    })}
                </IonList>
                <IonFab vertical="bottom" horizontal="end" slot="fixed" onClick={this.addStudentToDB.bind(this)}>
                    <IonFabButton>
                        <IonIcon icon={personAdd} />
                    </IonFabButton>
                </IonFab>
            </>
        )
    }

    private addStudentToDB() {
        const { userService } = this.props;
        sessionStorage.removeItem("students");
        userService.saveOrUpdateUser({
            "id": 1,
            "fullName": "Max4",
            "address": "1234 rue dupuis, h3k 1c83",
            "phone": "514-962-00274",
            "email": "dupuismaxime4@hotmail.com"
        } as IUser);
    }
}

export default UserList
