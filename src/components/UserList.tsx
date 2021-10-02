import { IonFab, IonFabButton, IonIcon, IonItem, IonList, IonSearchbar } from '@ionic/react';
import { person, personAdd } from 'ionicons/icons';
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
                    {users.sort((userA, userB) => {
                        return (userA.student === userB.student) ? 0 : userA.student ? 1 : -1;
                    }).map((user, key) => {
                        var nameAsArray = user.fullName ? Array.from(user.fullName) : null;
                        if (nameAsArray && searchText == null || searchText == "" || nameAsArray.includes(searchText))
                            return <IonItem key={key}><IonIcon icon={person} color={user.student ? "success" : "secondary"} /> {user.fullName}</IonItem>
                    })}
                </IonList>
            </>
        )
    }
}

export default UserList
