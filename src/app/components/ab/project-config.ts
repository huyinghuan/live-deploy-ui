import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { API } from '../../services/API';
import { ActivatedRoute, ParamMap, Router} from '@angular/router';
let template:string = 
`
<div style="margin-left:30px;margin-right:30px;">
  <table class="ui celled striped table">
    <thead>
      <tr>
        <th colspan="6">
          <a class="ui tag label">项目名称: {{project.name}}</a>
          <a class="ui teal tag label">分流参数: {{project.parameter}}s</a>
          <div class="ui right floated buttons">            
            <button class="ui icon red button" (click)="delProject(project.id)" title="删除"><i class="trash icon"></i></button>
            <button class="ui icon blue button" (click)="projectEditing=true" title=“编辑”><i class="edit icon"></i></button>
            <button class="ui icon green button"  (click)="versionAdding=true" title="添加版本"><i class="tag icon"></i></button>
          </div>
        </th>
      </tr>
      <tr>
        <th colspan="6" ab-project-edit  *ngIf="projectEditing"  (onCancelEditProject)="projectEditing=false" (onSaveProject)="onSaveProject($event)" [project]="project"></th>
      </tr>
      <tr [style.display]="versionAdding ? 'table-row' : 'none'">
        <th colspan="6" ab-version-edit (onCancelAddVersion)="versionAdding=false" (onSaveVersion)="saveVersion()" [version]="version"></th>
      </tr>
    </thead>
    <thead>
      <tr><th>版本</th><th>比例</th><th>操作</th></tr>
    </thead>
    <tbody>
      <tr *ngFor="let version of versionList">
        <td>{{version.tag}}</td>
        <td>{{version.proportion}}</td>
        <td class="collapsing">
          <div class="ui buttons">
            <button class="ui icon red button"  (click)="delVersion(version.id)" title="删除"><i class="trash icon"></i></button>
            <button class="ui icon blue button" (click)="editVersion(version)" title=“编辑”><i class="edit icon"></i></button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="ui divider"></div>
</div>
`

@Component({
  selector: 'ab-project-config',
  template: template,
  outputs: ['onLoadProjectListEvent']
})
export class ABProjectConfigComponent implements OnInit  {
  @Input() public project:any;
  public onLoadProjectListEvent = new EventEmitter()
  constructor(private api:API,private route:ActivatedRoute, private navRouter: Router){}
  private subscriptParams
  private params:any = {}
  projectEditing:boolean = false
  versionAdding:boolean = false
  version:any = {}
  versionList:Array<any> = []
  clearForm(){
    this.version = {}
  }
  ngOnInit() {
    this.subscriptParams = this.route.params.subscribe((params)=>{
      this.params = params
    })
    this.loadVersionList()
  }
  ngOnDestroy() {
    this.subscriptParams.unsubscribe()
  }
  delProject(id){
    this.api.remove("machine.ab.project",Object.assign({project:id}, this.params)).then(()=>{
     //通知父级刷新列表
     this.onLoadProjectListEvent.emit({id:1})
    })
  }
  onSaveProject(project){
    console.log(project)
    this.api.put("machine.ab.project", Object.assign({project:this.project.id}, this.params), project).then((data)=>{
      this.project = data
      this.projectEditing = false
    })
  }
  saveVersion(){
    let url  = `machine.ab.project.version`
    let method = "POST"
    let urlParams = {project:this.project.id}
    if(this.version.id){
      urlParams["version"] = this.version.id
      method ="PUT"
    }
    this.api.all(method, url, Object.assign(urlParams, this.params), this.version).then((data)=>{
      if(method == "PUT"){
        this.versionAdding = false
      }
      this.loadVersionList()
      this.clearForm()
    })
  }
  loadVersionList(){
    this.api.get("machine.ab.project.version",  Object.assign({project: this.project.id}, this.params)).then((data:Array<any>)=>{
      this.versionList = data
    })
  }
  delVersion(versionID){
    this.api.remove("machine.ab.project.version", Object.assign({version: versionID, project: this.project.id}, this.params)).then(()=>{
      this.loadVersionList()
    })
  }
  editVersion(version){
    this.versionAdding = true
    this.version = version 
  }
}
