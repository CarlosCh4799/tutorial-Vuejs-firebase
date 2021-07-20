import firebase from 'firebase'
import { ref, onUnmounted } from 'vue'

const config = {
    apiKey: "AIzaSyC2VkqfIU5_lSJD1e62M0IkWGv1WVNYix8",
    authDomain: "vue-video-be852.firebaseapp.com",
    projectId: "vue-video-be852",
    storageBucket: "vue-video-be852.appspot.com",
    messagingSenderId: "591768142513",
    appId: "1:591768142513:web:b29fcd8d2bdd95e642d890"
  };

  const firebaseApp = firebase.initializeApp(config)

  const db = firebaseApp.firestore()
  const usersCollection = db.collection('users')

  export const createUser = user => {
      return usersCollection.add(user)
  }

  export const getUser = async id => {
      const user = await usersCollection.doc(id).get()
      return user.exists ? user.data() : null
  }

  export const updateUser = (id,user) => {
      return usersCollection.doc(id).update(user)
  }

  export const deleteUser = id => {
      return usersCollection.doc(id).delete()
  }

  export const useLoadUsers = () => {
      const users = ref([])
      const close = usersCollection.onSnapshot(snapshot => {
          users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      })
      onUnmounted(close)
      return users 
  }

  const bonosCollection = db.collection('bonos')

  export const createBono = bono => {
      return bonosCollection.add(bono)
  }

  export const getBono = async id => {
      const bono = await bonosCollection.doc(id).get()
      return bono.exists ? bono.data() : null
  }

  export const updateBono = (id,bono) => {
      return bonosCollection.doc(id).update(bono)
  }

  export const deleteBono = id => {
      return bonosCollection.doc(id).delete()
  }

  export const useLoadBonos = () => {
      const bonos = ref([])
      const close = bonosCollection.onSnapshot(snapshot => {
          bonos.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      })
      onUnmounted(close)
      return bonos 
  }