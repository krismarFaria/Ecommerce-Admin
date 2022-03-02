import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  constructor(private auth: AngularFireAuth,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private router: Router) { }




    logout() {
      this.auth.auth.signOut().then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('uid');
        this.router.navigate(['login']);
      });
    }


    Login(user: User) {
      return this.auth.auth.signInWithEmailAndPassword(user.email, user.password);
    }
  
    UserId() {
      return this.auth.auth.currentUser.uid;
    }
  
    CreateUserAuth(user: User) {
      return this.auth.auth.createUserWithEmailAndPassword(user.email, user.password);
    }
  
  
    CreateUserDB(user, id) {
      return this.db.collection('users').doc(id).set(user)
    }
  
    Database() {
      return this.db;
    }
  
  
    getCurrentUser(uid) {
      return this.db.doc('users/' + uid).valueChanges();
    }



   loader(){
     return this.loadingController;
   } 


   getColletion(collection) {
    return this.db.collection(collection).snapshotChanges();
  }
  getColletionConditional(collection, condition) {
    return this.db.collection(collection, condition).snapshotChanges();
  }

//Productos

  getProducts() {
    return this.db.collection('products').snapshotChanges();
  }

  getProductById(id) {
    return this.db.doc('products/'+ id);
  }

  addProduct(product) {
    return this.db.collection('products').add(product);
  }

  updateProduct(product: Product) {
    return this.db.collection('products').doc(product.id).update({
      name: product.name,
      price: product.price,
      image: product.image,     
      stock: product.stock,
      description: product.description
    });
  }

  deleteProduct(id) {
    return this.db.collection('products').doc(id).delete();
  }


/******************************marketing*********************************************/


getMarketing() {
  return this.db.collection('marketing').snapshotChanges();
}

getMarketingById(id) {
  return this.db.doc('marketing/'+ id);
}

addMarketing(product) {
  return this.db.collection('marketing').add(product);
}

updateMarketing(product: Product) {
  return this.db.collection('marketing').doc(product.id).update({
    name: product.name,
    image: product.image, 
    description: product.description
     
  });
}

deleteMarketing(id) {
  return this.db.collection('marketing').doc(id).delete();
}


/******************************categorias*********************************************/

getCategories() {
  return this.db.collection('categories').snapshotChanges();
}

getCategoryById(id) {
  return this.db.doc('categories/'+ id);
}

addCategory(category) {
  return this.db.collection('categories').add(category);
}

updateCategory(category: Product) {
  return this.db.collection('categories').doc(category.id).update({
    name: category.name,  
    image: category.image,     
   
  });
}


deleteCategory(id) {
  return this.db.collection('categories').doc(id).delete()
 
}

deleteCategoryProducts(id){
  
 return this.db.firestore.collection('products').get().then(function(querySnapshot) {
    querySnapshot.query.where('categoryId', '==',id).get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        doc.ref.delete()
      })
    })
});
}

  async uploadProfilePhoto(id, file): Promise<any> {

    if (file && file.length) {
      try {
        const loading = await this.loadingController.create();
        await loading.present();

        const task = await this.storage.ref(id).child(id).put(file[0])
        loading.dismiss();
        return this.storage.ref(`${id}/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }



async toast(message, color) {
  const toast = await this.toastController.create({
    message: message,
    duration: 1000,
    color: color
  });
  toast.present();
}


async Toast(message) {
  const toast = await this.toastController.create({
    message: message,
    duration: 1000,
    color: 'primary',
    position: 'middle'
  });
  toast.present();
}

routerLink() {
  return this.router;
}




}
