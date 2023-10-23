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

  def about() = Action {
    Ok(views.html.index())
  }

  def display: Action[AnyContent] = Action {
    Ok(asText)
  }

  def load() = Action {
    controller.load
    Ok(asText)
  }

  def undo() = Action {
    controller.undo
    Ok(asText)
  }

  def redo() = Action {
    controller.redo
    Ok(asText)
  }

  def move(input: String): Action[AnyContent] = Action {
    val move: Move = Move(input(0), input(1), input(2), true)
    controller.publish(controller.put, move)
    Ok(asText)
  }
}
