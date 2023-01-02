import { collection, query, addDoc, getDoc, getDocs, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from '../credentials'
import { fDocument }  from "./fDocument"
import { fList } from "./fList"
import { validate, isValid, validateObj } from "./helpers"
import { reactive } from 'vue';

// TODO: Abstract Structurue of the template
// const template = {
//     "___name" : "Posts",
//     "key1": ["String", REQUIRED],
//     "key2": ["String", OPTIONAL],
//     "key3": ["Map", REQUIRED],
//     "key4": ["Array", OPTIONAL]
// }

export class fCollection {
    constructor(template) {
        this.collectionName = template["___name"];
        this.template = template;
    }

    async getOne(id) {
        const docRef = doc(db, this.collectionName, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            let validatedDoc = validate(docSnap.data(), this.template)
            validatedDoc['id'] = docSnap.id
            return new fDocument(validatedDoc, this.template)
        } else {
            console.log(`Document with id ${id} does not exist on firestore`)
            return fDocument.dummy(this.template)
        }
    }

    async get(...args) {
        let q = query(collection(db, this.collectionName), ...args)
        const querySnapshot = await getDocs(q);
        let lofd = []
        querySnapshot.forEach((doc) => {
            let validatedDoc = validate(doc.data(), this.template)
            validatedDoc["id"] = doc.id
            lofd.push(new fDocument(validatedDoc, this.template))
        });
        let lofl = new fList(lofd)
        return lofl
    }

    async doc(docc) {
        if(isValid(docc, this.template)) {
            let validatedDoc = validateObj(docc, this.template);
            const docRef = await addDoc(collection(db, this.collectionName), validatedDoc);
            validatedDoc["id"] = docRef.id
            return new fDocument(validatedDoc, this.template)

        } else {
            console.log('The data passed in does not match the Type you declared!')
            return fDocument.dummy(this.template)
        }
    }

    async listen(...args) {
        let los = reactive(new fList([], this.template))
        const q = query(collection(db, this.collectionName), ...args);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            los.removeAll()
            querySnapshot.forEach((doc) => {
                let validatedDoc = validate(doc.data(), this.template)
                validatedDoc["id"] = doc.id
                los.append(new fDocument(validatedDoc, this.template))
            });
        });
        return los
    }

    async listenToOne(id) {
        let docData = reactive(new fDocument({"id":"tempInsert"}, this.template));
        const unsub = onSnapshot(doc(db, this.collectionName, id), (doc) => {
            let validatedDoc = validate(doc.data(), this.template)
            validatedDoc["id"] = doc.id
            Object.assign(docData, validatedDoc);
        });
        return docData
    }
}

export class fUser extends fCollection {
    constructor(template) {
        template["___name"] = "Users";
        super(template);
    }

    async _docwithid(docc, id) {
        if(isValid(docc, this.template)) {
            let validatedDoc = validateObj(docc, this.template);
            const docRef = await setDoc(doc(db, this.collectionName, id), validatedDoc);
            validatedDoc["id"] = id
            return new fDocument(validatedDoc, this.template)
        } else {
            console.log('The data passed in does not match the Type you declared!')
            return fDocument.dummy(this.template)
        }
    }
}