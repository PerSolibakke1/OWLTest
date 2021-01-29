import io.ktor.application.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import java.net.HttpURLConnection
import java.net.URL
import java.net.URLEncoder

private fun setConnection(): String {
    try {
        val query = URLEncoder.encode(
            """
    PREFIX : <http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#>
    SELECT *
    WHERE {
    	?Wine :hasBody :Full .
    } LIMIT 100

""".trimIndent(), "UTF-8"
        )
        val url = URL("http://localhost:7200/repositories/test?query=${query}")
        return (url.openConnection() as HttpURLConnection).run {
            requestMethod = "GET"

            setRequestProperty("Accept", "application/json")
            inputStream.bufferedReader().readText()
        }

    } catch (e: Exception) {
        println(e)
        return ""
    }
}

fun main() {
    embeddedServer(Netty, port = 8080, host = "127.0.0.1") {
        routing {
            get("/") {
                call.respondText(contentType = ContentType.Application.Json, HttpStatusCode.OK) { setConnection() }
            }
        }
    }.start(wait = true)
}
