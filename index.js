$(function () {
    getTask();
    var transmitElement = document.getElementsByClassName("transmit");


    var sendDataElement = document.getElementById("sendData");
    sendDataElement.addEventListener("click", function () {
        var message = document.getElementById("data").value;
        addTask(message);
    })

    var sendElement = document.getElementById("sendData");
    sendElement.addEventListener("click", function () {
        $.ajax({
            type: "GET",
            url: "controllers/task/get_task.php",
            dataType: "json",
            success: function (json) {

            }
        });
    });


    function getTask() {
        $.ajax({
            type: "GET",
            url: "controllers/task/get_task.php",
            dataType: "json",
            success: function (json) {

                var myTableElement = document.getElementById("myTable");
                myTableElement.innerHTML = "";

                /* Génération du header du tableau  */
                var firstTrElement = document.createElement("tr");
                var firstThElement = document.createElement("th");
                firstThElement.innerHTML = " Id "
                firstTrElement.appendChild(firstThElement);

                var secondThElement = document.createElement("th");
                secondThElement.innerHTML = "Tâche"
                firstTrElement.appendChild(secondThElement);
                var thirdThElement = document.createElement("th");
                thirdThElement.innerHTML = "Date"
                firstTrElement.appendChild(thirdThElement);
                var fourthThElement = document.createElement("th");
                fourthThElement.innerHTML = "Utilisateur";
                firstTrElement.appendChild(fourthThElement)
                var fiveThElement = document.createElement("th");
                fiveThElement.innerHTML = "Action";
                firstTrElement.appendChild(fiveThElement);

                myTableElement.appendChild(firstTrElement);
                /* Fin de la génération du header */
                /* Génération dynamique des cellules du tableau*/
                for (var i = 0; i < json.length; i++) {
                    var trElement = document.createElement("tr");

                    var idTdElement = document.createElement("td");
                    idTdElement.innerHTML = json[i].task_id;
                    trElement.appendChild(idTdElement);

                    var taskTdElement = document.createElement("td");
                    taskTdElement.innerHTML = json[i].task_name;
                    trElement.appendChild(taskTdElement);

                    var dateTdElement = document.createElement("td");
                    dateTdElement.innerHTML = json[i].task_date;
                    trElement.appendChild(dateTdElement);

                    var userTdElement = document.createElement("td");
                    if (json[i].task_user == null || json[i].task_user == "") {
                        userTdElement.innerHTML = "  -  ";
                    } else {
                        userTdElement.innerHTML = json[i].task_user;
                    }
                    trElement.appendChild(userTdElement);

                    var actionTdElement = document.createElement("td");
                    actionTdElement.innerHTML = '<i data-id="' + json[i].task_id + '" class="fa fa-times fa-3x delete">'
                    actionTdElement.innerHTML += '<i data-id="' + json[i].task_id + '" class="fa fa-gear fa-3x edit">'
                    actionTdElement.innerHTML += '<i data-id="' + json[i].task_id + '" class="fa fa-user fa-3x userAction">'
                    trElement.appendChild(actionTdElement);

                    myTableElement.appendChild(trElement);
                }
                /* fin de la génération dynamique du tableau */

                var editAction = document.getElementsByClassName("edit");

                for (var i = 0; i < editAction.length; i++) {
                    editAction[i].addEventListener("click", function (e) {
                        e.stopPropagation;
                        var id = this.getAttribute("data-id");
                        editTask(id);
                    });
                }
                var deleteAction = document.getElementsByClassName("delete");

                for (var i = 0; i < deleteAction.length; i++) {
                    deleteAction[i].addEventListener("click", function (f) {
                        Function.stopPropagation;
                        var id = this.getAttribute("data-id");
                        deleteTask(id);
                    });
                }
                var userAction = document.getElementsByClassName("userAction");

                for (var i = 0; i < userAction.length; i++) {
                    userAction[i].addEventListener("click", function (g) {
                        g.stopPropagation;
                        var id = this.getAttribute("data-id");
                        paramUser(id);
                    });
                }

            }
        })
    }
    // function pour supprimer la tâche selectionné
    function deleteTask(id) {
        var modal = document.getElementById('myModal');
        modal.style.display = "block";
        var contentElement = document.getElementsByClassName("modal-body");
        contentElement[0].innerHTML = "Êtes-vous sûr de vouloir supprimer ?"


        dismissElement = document.getElementsByClassName("dismiss");
        dismissElement[0].addEventListener("click", function () {
            modal.style.display = "none";
        }, { once: true });

        transmitElement = document.getElementsByClassName("transmit");
        transmitElement[0].addEventListener("click", function (e) {
            $.ajax({
                type: "GET",
                data: {
                    id: id
                },
                url: "controllers/task/remove_task.php",
                dataType: "json",
                success: function (json) {
                    alert("tâche bien supprimé");
                    modal.style.display = "none";
                    getTask();
                }
            })
        }, { once: true });
    }

    // fonction pour ajouter une tâche
    function addTask(message) {
        $.ajax({
            type: "GET",
            data: {
                message: message
            },
            url: "controllers/task/add_task.php",
            dataType: "json",
            success: function (json) {
                alert("tâche bien ajouté");
                getTask();
            }
        });
    }

    // fonction pour éditer une tâche spécifique
    function editTask(id) {
        $.ajax({
            type: "GET",
            data: { id: id },
            url: "controllers/task/get_task_by_id.php",
            dataType: "json",
            success: function (json) {
                var modal = document.getElementById('myModal');
                modal.style.display = "block";
                var contentElement = document.getElementsByClassName("modal-body");
                contentElement[0].innerHTML = "<p> tâche à changer : </p>"

                var inputElement = document.createElement("input");
                inputElement.setAttribute("type", "text");
                inputElement.setAttribute("id", "dataToChange");
                inputElement.value = json[0].task_name;

                contentElement[0].appendChild(inputElement);

                var dismissElement = document.getElementsByClassName("dismiss");
                dismissElement[0].addEventListener("click", function () {
                    modal.style.display = "none";
                }, { once: true });

                var transmitElement = document.getElementsByClassName("transmit");
                transmitElement[0].addEventListener("click", function () {

                    var textToChangeElement = document.getElementById("dataToChange").value;
                    $.ajax({
                        type: "GET",
                        data: {
                            message: textToChangeElement,
                            id: id
                        },
                        url: "controllers/task/update_task.php",
                        dataType: "json",
                        success: function (json) {
                            alert("tâche bien modifié");
                            modal.style.display = "none";
                            getTask();
                        }
                    });

                }, { once: true });
            }
        })


    }

    // fonction qui gère tout les parametres au niveau des utilisateurs
    function paramUser(id) {
        var modalUser = document.getElementById('myModalUser');
        modalUser.style.display = "block";


        bodyElement = document.getElementsByClassName("modal-body")[1];
        bodyElement.innerHTML = "";
        bodyElement.innerHTML = '<button class="button addUser" style="width:100%;"> Ajouter utilisateur </button>'
        bodyElement.innerHTML += '<button class="button editUser" style="width:100%;">Modifier utilisateur</button>'
        bodyElement.innerHTML += '<button class="button giveTask" style="width:100%;"> Attribuer Tâche </button>'


        var dismissElement = document.getElementsByClassName("dismiss");
        dismissElement[1].addEventListener("click", function () {
            modalUser.style.display = "none";
        }, { once: true });



        var addUserElement = document.getElementsByClassName("addUser")[0];
        addUserElement.addEventListener("click", function () {
            bodyElement = document.getElementsByClassName("modal-body")[1];
            bodyElement.innerHTML = "";
            var pElement = document.createElement("p");
            pElement.innerHTML = "Utilisateur à ajouter :";
            bodyElement.appendChild(pElement);
            var inputElement = document.createElement("input");
            inputElement.setAttribute("id", "userToAdd");
            bodyElement.appendChild(inputElement);

            var buttonElement = document.createElement("button");
            buttonElement.setAttribute("id", "userToAddConfirm");
            buttonElement.innerHTML = "Ajouter";
            bodyElement.appendChild(buttonElement);


            buttonElement.addEventListener("click", function () {
                var userElement = document.getElementById("userToAdd").value;
                $.ajax({
                    type: "GET",
                    data: { user: userElement },
                    url: "controllers/user/add_user.php",
                    dataType: "json",
                    success: function (json) {
                        alert("Utilisateur bien ajouté");
                        modalUser.style.display = "none";

                    }
                })
            }, { once: true })



        }, { once: true })

        var giveTaskElement = document.getElementsByClassName("giveTask")[0];
        giveTaskElement.addEventListener("click", function () {
            $.ajax({
                type: "GET",
                url: "controllers/user/get_user.php",
                dataType: "json",
                success: function (json) {
                    bodyElement = document.getElementsByClassName("modal-body")[1];
                    bodyElement.innerHTML = "";

                    var selectElement = document.createElement("select");

                    var staticOptionElement = document.createElement("option");
                    staticOptionElement.innerHTML = "";

                    selectElement.appendChild(staticOptionElement);

                    for (var i = 0; i < json.length; i++) {
                        var dynamicOptionElement = document.createElement("option");
                        dynamicOptionElement.innerHTML = json[i].user_name;
                        selectElement.appendChild(dynamicOptionElement);
                    }
                    bodyElement.appendChild(selectElement);

                    var buttonSend = document.createElement("button");
                    buttonSend.innerHTML = "Attribuer";
                    buttonSend.setAttribute("class", "button");
                    buttonSend.setAttribute("style", "width:100%");
                    bodyElement.appendChild(buttonSend);


                    buttonSend.addEventListener("click", function () {
                        user = selectElement.value;
                        userId = id;
                        $.ajax({
                            type: "GET",
                            data: {
                                user: user,
                                id: userId
                            },
                            url: "controllers/user/give_task.php",
                            dataType: "json",
                            success: function (json) {
                                alert("tâche bien attribué");
                                modalUser.style.display = "none";
                                getTask();

                            }
                        })
                    }, { once: true })

                }
            });

        }, { once: true })

        var editUser = document.getElementsByClassName("editUser")[0];
        editUser.addEventListener("click", function () {
            $.ajax({
                type: "GET",
                url: "controllers/user/get_user.php",
                dataType: "json",
                success: function (json) {
                    bodyElement = document.getElementsByClassName("modal-body")[1];
                    bodyElement.innerHTML = "";

                    var tableElement = document.createElement("table");
                    tableElement.setAttribute("id", "myTable");
                    var trHeaderElement = document.createElement("tr");


                    var firstThElement = document.createElement("th");
                    firstThElement.innerHTML = "Id";
                    trHeaderElement.appendChild(firstThElement);
                    var secondThElement = document.createElement("th")
                    secondThElement.innerHTML = "Utilisateur";
                    trHeaderElement.appendChild(secondThElement);
                    var thirdThElement = document.createElement("th");
                    thirdThElement.innerHTML = "Action";
                    trHeaderElement.appendChild(thirdThElement);

                    tableElement.appendChild(trHeaderElement);


                    for (var i = 0; i < json.length; i++) {
                        var dynamicTr = document.createElement("tr");


                        var dynamicFirstTd = document.createElement("td");
                        dynamicFirstTd.innerHTML = json[i].user_id;
                        dynamicTr.appendChild(dynamicFirstTd);

                        var dynamicSecondTd = document.createElement("td");
                        dynamicSecondTd.innerHTML = json[i].user_name;
                        dynamicTr.appendChild(dynamicSecondTd);

                        var dynamicThirdTd = document.createElement("td");
                        dynamicThirdTd.innerHTML = '<i data-id="' + json[i].user_id + '" class="fa fa-times fa-2x deleteUser" id="deleteUser"/>'
                        dynamicThirdTd.innerHTML += '<i data-id="' + json[i].user_id + '" class="fa fa-pencil fa-2x renameUser" id="renameUser"/>'
                        dynamicTr.appendChild(dynamicThirdTd);
                        tableElement.appendChild(dynamicTr);
                    }

                    bodyElement.appendChild(tableElement);

                    var deleteUserElement = document.getElementsByClassName("deleteUser");
                    for (var i = 0; i < deleteUserElement.length; i++) {

                        deleteUserElement[i].addEventListener("click", function () {
                            var myIdElement = this.getAttribute("data-id");
                            $.ajax({
                                type: "GET",
                                data: { id: myIdElement },
                                url: "controllers/user/delete_user.php",
                                dataType: "json",
                                success: function (json) {
                                    alert("Utilisateur bien supprimé");
                                    modalUser.style.display = "none";
                                }
                            });
                        });
                    }

                    var renameUserElement = document.getElementsByClassName("renameUser");
                    for (var i = 0; i < renameUserElement.length; i++) {
                        renameUserElement[i].addEventListener("click", function () {
                            var myIdElement = this.getAttribute("data-id");
                            $.ajax({
                                type: "GET",
                                data: { id: myIdElement },
                                url: "controllers/user/get_user_by_id.php",
                                dataType: "json",
                                success: function (json) {
                                    bodyElement = document.getElementsByClassName("modal-body")[1];
                                    bodyElement.innerHTML = "";

                                    inputElement = document.createElement("input");
                                    inputElement.setAttribute("id", "userToRename");

                                    inputElement.value = json[0].user_name;

                                    buttonElement = document.createElement("button");
                                    buttonElement.setAttribute("id", "dataToSend");
                                    buttonElement.setAttribute("data-id", json[0].user_id);
                                    buttonElement.innerHTML = "Modifier";

                                    buttonElement.addEventListener("click", function () {
                                        var data = document.getElementById("userToRename").value;

                                        $.ajax({
                                            type: "GET",
                                            data: {
                                                name: data,
                                                id: myIdElement
                                            },
                                            url: "controllers/user/update_user.php",
                                            dataType: "json",
                                            success: function (json) {
                                                alert("Utilisateur bien modifié");
                                                modalUser.style.display = "none";
                                                getTask();
                                            }
                                        });
                                    })

                                    bodyElement.appendChild(inputElement);
                                    bodyElement.appendChild(buttonElement);




                                }
                            });
                        })
                    }



                }
            })
        }, { once: true })

    }

})
