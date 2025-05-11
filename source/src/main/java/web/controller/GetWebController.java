package web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class GetWebController {
     
	@RequestMapping(value="/")
	public String showMain() {
		return "main";
	}

	@RequestMapping(value="/voronezh")
	public String showVoronezh() {
		return "voronezh";
	}

	@RequestMapping(value="/design")
	public String showDesign() {
		return "design";
	}

}