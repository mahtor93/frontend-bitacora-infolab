import CreateUser from "@/app/components/administracion/createUsers/createUser.component";
import ListUsers from "@/app/components/administracion/listUsers/listUsers.component";

export default function UserAdmin() {
    return(
        <div className="mainContent">
        <h2>Administración</h2>
        <ListUsers/>
        <CreateUser/>
        </div>

    )
}