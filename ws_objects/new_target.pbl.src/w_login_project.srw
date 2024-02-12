$PBExportHeader$w_login_project.srw
forward
global type w_login_project from window
end type
type sle_2 from singlelineedit within w_login_project
end type
type sle_1 from singlelineedit within w_login_project
end type
type st_2 from statictext within w_login_project
end type
type st_1 from statictext within w_login_project
end type
type cb_1 from commandbutton within w_login_project
end type
end forward

global type w_login_project from window
integer width = 3378
integer height = 1408
boolean titlebar = true
string title = "Untitled"
boolean controlmenu = true
boolean minbox = true
boolean maxbox = true
boolean resizable = true
long backcolor = 67108864
string icon = "AppIcon!"
boolean center = true
sle_2 sle_2
sle_1 sle_1
st_2 st_2
st_1 st_1
cb_1 cb_1
end type
global w_login_project w_login_project

on w_login_project.create
this.sle_2=create sle_2
this.sle_1=create sle_1
this.st_2=create st_2
this.st_1=create st_1
this.cb_1=create cb_1
this.Control[]={this.sle_2,&
this.sle_1,&
this.st_2,&
this.st_1,&
this.cb_1}
end on

on w_login_project.destroy
destroy(this.sle_2)
destroy(this.sle_1)
destroy(this.st_2)
destroy(this.st_1)
destroy(this.cb_1)
end on

type sle_2 from singlelineedit within w_login_project
integer x = 1271
integer y = 388
integer width = 402
integer height = 112
integer taborder = 20
integer textsize = -10
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Tahoma"
long textcolor = 33554432
borderstyle borderstyle = stylelowered!
end type

type sle_1 from singlelineedit within w_login_project
integer x = 1275
integer y = 184
integer width = 402
integer height = 112
integer taborder = 10
integer textsize = -10
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Tahoma"
long textcolor = 33554432
borderstyle borderstyle = stylelowered!
end type

type st_2 from statictext within w_login_project
integer x = 590
integer y = 392
integer width = 517
integer height = 64
integer textsize = -10
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Tahoma"
long textcolor = 33554432
long backcolor = 67108864
string text = "ENTER PASSWORD"
boolean focusrectangle = false
end type

type st_1 from statictext within w_login_project
integer x = 594
integer y = 196
integer width = 421
integer height = 64
integer textsize = -10
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Tahoma"
long textcolor = 33554432
long backcolor = 67108864
string text = "ENTER LOGINID"
boolean focusrectangle = false
end type

type cb_1 from commandbutton within w_login_project
integer x = 1275
integer y = 588
integer width = 402
integer height = 112
integer taborder = 10
integer textsize = -10
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Tahoma"
string text = "LOGIN"
end type

event clicked;if sqlca.sqlcode = 0 then
	messagebox ("Success","Connected") 
else
	messagebox ("Failed", "Not Connected")
end if

int num, num2
string username, password
username = sle_1.text
password = sle_2.text

connect using (sqlca);

select count(LOGINID) into :num from project where LOGINID = :username;
//num=integer('select count(loginid) into :num from project where loginid =:username');
messagebox("value",'Count of loginid' + string(num))
if num >=1 then

	select count(PASSWORD) into :num2 from project where PASSWORD = :password;
	if num2 >=1 then	
		open(w_neww)
	else
		Messagebox("Result", 'Wrong userid')
	end if 
else
	Messagebox("Result", 'Invalid Password')
end if
	
end event

