import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {
  form: FormGroup;
  selectedFile;
  imgLoaded = false;
  @Input()c;
  
  constructor(private firebaseService: FirebaseService,
    private formBuilder: FormBuilder,
     private modalController: ModalController) { }

  ngOnInit() {
  
  
  
    this.form = this.formBuilder.group({
      id: [this.c.id, [Validators.required]],
      name: [this.c.name, [Validators.required]],
      image: [this.c.image, [Validators.required]]
     
    });
  }

  async chooseImage(event) {
    setTimeout(() => {
      this.imgLoaded = true;
    }, 2000);
    this.selectedFile = event.target.files;
    this.image.setValue(await this.firebaseService.uploadProfilePhoto(Date.now().toString(), this.selectedFile));
  }



  


  async editCategory() {
  
if(this.validator()){

    const loading = await this.firebaseService.loader().create();
    await loading.present();

    this.firebaseService.updateCategory(this.form.value).then(res => {
      this.firebaseService.toast('La categoría fue actualizado con exito', 'success');
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
