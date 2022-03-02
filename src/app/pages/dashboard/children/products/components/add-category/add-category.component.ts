import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  form: FormGroup;
  selectedFile;
  imgLoaded = false;

  constructor(private firebaseService: FirebaseService,
    private formBuilder: FormBuilder,
     private modalController: ModalController) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      image: ['', [Validators.required]]
      
    });
  }

  async chooseImage(event) {
    setTimeout(() => {
      this.imgLoaded = true;
    }, 2000);
    this.selectedFile = event.target.files;
    this.image.setValue(await this.firebaseService.uploadProfilePhoto(Date.now().toString(), this.selectedFile));
  }

  async addCategory() {
    if(this.validator()){
        const loading = await this.firebaseService.loader().create();
        await loading.present();
    
        this.firebaseService.addCategory(this.form.value).then(res => {
          this.firebaseService.toast('El producto fue creado con exito', 'success');
          this.modalController.dismiss();
          loading.dismiss();
        }, error => {
          this.firebaseService.toast('Ha ocurrido un error', 'danger');
          loading.dismiss();
        })
    }
  }

  validator(){
    if (!this.image.value){
      this.firebaseService.toast('Selecciona una imagen para el producto', 'warning')
      return false;
    }
  
    if (!this.form.valid){
      this.firebaseService.toast('Completa los campos correctamente', 'warning')
      return false;
    }
  
    return true;
  }
  
    get name() {
      return this.form.get('name');
    }
  
    get image() {
      return this.form.get('image');
    }
  
}
