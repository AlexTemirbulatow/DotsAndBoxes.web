package controllers

import javax.inject._
import play.api._
import play.api.mvc._

import de.htwg.se.dotsandboxes.controller.controllerComponent.controllerImpl.Controller
import de.htwg.se.dotsandboxes.model.fieldComponent.fieldImpl.Move
import de.htwg.se.dotsandboxes.Default.given_FieldInterface
import de.htwg.se.dotsandboxes.Default.given_FileIOInterface


@Singleton
class HomeController @Inject() (cc: ControllerComponents) extends AbstractController(cc) {
  val controller = new Controller()
  def asText = controller.toString

  def about = Action {
    Ok(views.html.index())
  }
  
  def display = Action {
    Ok(asText)
  }

  def load = Action {
    controller.load
    Ok(asText)
  }

  def undo = Action {
    controller.publish(controller.undo)
    Ok(asText)
  }

  def redo = Action {
    controller.publish(controller.redo)
    Ok(asText)
  }

  def move(input: String): Action[AnyContent] = Action {
    val chars = input.toCharArray
    val move: Move = Move(chars(0).toString.toInt, chars(1).toString.toInt, chars(2).toString.toInt, true)
    controller.publish(controller.put, move)
    Ok(asText)
  }
}
