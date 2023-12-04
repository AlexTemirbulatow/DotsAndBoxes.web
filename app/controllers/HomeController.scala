package controllers

import akka.actor._
import akka.stream.Materializer
import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import play.api.libs.streams.ActorFlow
import de.htwg.se.dotsandboxes.util.{Observer, Event}
import de.htwg.se.dotsandboxes.Default.given_FieldInterface
import de.htwg.se.dotsandboxes.Default.given_FileIOInterface
import de.htwg.se.dotsandboxes.model.fieldComponent.fieldImpl.Move
import de.htwg.se.dotsandboxes.controller.controllerComponent.controllerImpl.Controller


@Singleton
class HomeController @Inject()(cc: ControllerComponents) (implicit system: ActorSystem, mat: Materializer) extends AbstractController(cc):
  val controller = new Controller()
  def getField = controller.toString

  def home = Action { Ok(views.html.index()) }
  def game = Action { Ok(views.html.field(controller)) }
  def tui  = Action { Ok(getField) }

  def move(input: String): Action[AnyContent] = Action {
    val chars = input.toCharArray
    val move: Move = Move(chars(0).toString.toInt,
    chars(1).toString.toInt, chars(2).toString.toInt, true)
    controller.publish(controller.put, move)
    Ok(views.html.field(controller))
  }

  def save = Action {
    controller.save
    Ok(views.html.field(controller))
  }
  def load = Action {
    controller.load
    Ok(views.html.field(controller))
  }
  def undo = Action {
    controller.publish(controller.undo)
    Ok(views.html.field(controller))
  }
  def redo = Action {
    controller.publish(controller.redo)
    Ok(views.html.field(controller))
  }

  def gameToJson = Action {
    Ok(toJsonObj)
  }

  def socket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef { out =>
      DotsAndBoxesActorFactory.create(out)
    }
  }


  object DotsAndBoxesActorFactory:
    def create(out: ActorRef) =
      Props(new DotsAndBoxesActor(out))


  class DotsAndBoxesActor(out: ActorRef) extends Actor with Observer:
    controller.add(this)

    override def update(event: Event): Unit =
      out ! (toJsonObj.toString)

    def receive =
      case msg: String =>
        out ! (toJsonObj.toString)


  def toJsonObj =
    Json.obj(
      "field" -> Json.obj(
        "rowSize" -> controller.colSize(1, 0),
        "colSize" -> controller.rowSize(2),
        "playerSize" -> Json.toJson(controller.field.playerList.size),
        "currentPlayer" -> Json.toJson(controller.field.currentPlayerIndex),
        "gameEnded" -> controller.gameEnded,
        "winner" -> controller.winner,
        "playerList" -> Json.toJson(
          for
            playerIndex <- 0 until controller.field.playerList.size
          yield
            Json.obj(
              "index" -> playerIndex,
              "points" -> Json.toJson(controller.field.getPoints(playerIndex)))),
        "status" -> Json.toJson(
          for
            row <- 0 until controller.field.rowSize(0)
            col <- 0 until controller.field.colSize(0, 0)
          yield
            Json.obj(
              "row" -> row,
              "col" -> col,
              "value" -> Json.toJson(controller.field.getCell(0, row, col).toString))
        ),
        "rows" -> Json.toJson(
          for
            row <- 0 until controller.field.rowSize(1)
            col <- 0 until controller.field.colSize(1, 0)
          yield
            Json.obj(
              "row" -> row,
              "col" -> col,
              "value" -> Json.toJson(controller.field.getCell(1, row, col).toString.toBoolean))
        ),
        "cols" -> Json.toJson(
          for
            row <- 0 until controller.field.rowSize(2)
            col <- 0 until controller.field.colSize(2, 0)
          yield
            Json.obj(
              "row" -> row,
              "col" -> col,
              "value" -> Json.toJson(controller.field.getCell(2, row, col).toString.toBoolean)))))
