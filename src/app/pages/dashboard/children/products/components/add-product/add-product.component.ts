import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Product } from 'src/app/models/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  form: FormGroup;
  selectedFile;
  imgLoaded = false;
  categories = [];
  constructor(private firebaseService: FirebaseService,
    private formBuilder: FormBuilder,
    private modalController: ModalController) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      price: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoryId: ['', [Validators.required]]
    });

    this.getcategorys();
  }


  getcategorys() {

    this.firebaseService.getCategories().subscribe(data => {

      this.categories = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          image: e.payload.doc.data()['image'],
          
        };
      });

    }, error => {

    })
  }



  async chooseImage(event) {
    setTimeout(() => {
      this.imgLoaded = true;
    }, 2000);
    this.selectedFile = event.target.files;
    this.image.setValue(await this.firebaseService.uploadProfilePhoto(Date.now().toString(), this.selectedFile));
  }


  async addProduct() {
    if (this.validator()) {
      const loading = await this.firebaseService.loader().create();
      await loading.present();

      this.firebaseService.addProduct(this.form.value).then(res => {
        this.firebaseService.toast('El producto fue creado con exito', 'success');
        this.modalController.dismiss();
        loading.dismiss();
      }, error => {
        this.firebaseService.toast('Ha ocurrido un error', 'danger');
        loading.dismiss();
      })
    }
  }
 

  validator() {
    if (!this.image.value) {
      this.firebaseService.toast('Selecciona una imagen para el producto', 'warning')
      return false;
    }

    if (!this.form.valid) {
      this.firebaseService.toast('Completa los campos correctamente', 'warning')
      return false;
    }

    return true;
  }

  get name() {
    return this.form.get('name');
  }

  get price() {
    return this.form.get('price');
  }


  get stock() {
    return this.form.get('stock');
  }

  get image() {
    return this.form.get('image');
  }

  get categoryId() {
    return this.form.get('categoryId');
  }
  get description() {
    return this.form.get('description');
  }
}
