$PBExportHeader$w_neww.srw
forward
global type w_neww from window
end type
type cb_1 from commandbutton within w_neww
end type
end forward

global type w_neww from window
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
cb_1 cb_1
end type
global w_neww w_neww

on w_neww.create
this.cb_1=create cb_1
this.Control[]={this.cb_1}
end on

on w_neww.destroy
destroy(this.cb_1)
end on

type cb_1 from commandbutton within w_neww
integer x = 901
integer y = 376
integer width = 1495
integer height = 448
integer taborder = 10
integer textsize = -10
integer weight = 400
fontcharset fontcharset = ansi!
fontpitch fontpitch = variable!
fontfamily fontfamily = swiss!
string facename = "Tahoma"
string text = "connected"
end type

