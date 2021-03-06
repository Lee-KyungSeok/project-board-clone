package com.kyung.projectboard.services;

import com.kyung.projectboard.domain.Backlog;
import com.kyung.projectboard.domain.Project;
import com.kyung.projectboard.domain.ProjectTask;
import com.kyung.projectboard.exceptions.ProjectNotFoundException;
import com.kyung.projectboard.repository.BacklogRepository;
import com.kyung.projectboard.repository.ProjectRepository;
import com.kyung.projectboard.repository.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectService projectService;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask, String username) {

        // Project Tasks to be added to a specific project, project != null, BackLog exists
        Backlog backlog = projectService.findProjectByIdentifier(projectIdentifier, username).getBacklog();
        projectTask.setBacklog(backlog);
        // IDPRO-1, IDPRO-2 이런식으로 증가시킬 것
        Integer backlogSequence = backlog.getPTSequence();
        backlogSequence++;
        backlog.setPTSequence(backlogSequence);

        projectTask.setProjectSequence(projectIdentifier + "-" + backlogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);

        // INITIAL priority when status is null
        if (projectTask.getStatus() == null) {
            projectTask.setStatus("TO_DO");
        } else if (projectTask.getStatus().equals("")) {
            projectTask.setStatus("TO_DO");
        }

        // INITIAL priority when priority null
        if (projectTask.getPriority() == null) {
            projectTask.setPriority(3);
        } else if (projectTask.getPriority() == 0) {
            projectTask.setPriority(3);
        }

        return projectTaskRepository.save(projectTask);

    }

    public Iterable<ProjectTask> findBacklogById(String id, String username) {

        projectService.findProjectByIdentifier(id, username);

        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }

    public ProjectTask findPTByProjectSequence(String backlogId, String ptId, String username) {

        // make sure we are searching on an existing backlog
        projectService.findProjectByIdentifier(backlogId, username);

        //make sure that our task exists
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(ptId);
        if (projectTask == null) {
            throw new ProjectNotFoundException("Project Task '" + ptId + "' does not exist in project: '" + backlogId);
        }

        // make sure that the backlog/project id in the path corresponds to the right project
        if (!projectTask.getProjectIdentifier().equals(backlogId)) {
            throw new ProjectNotFoundException("Project Task '" + ptId + "' does not exist in project: '" + backlogId);
        }

        return projectTask;
    }

    public ProjectTask updateByProjectSequence(ProjectTask updatedTask, String backlogId, String ptId, String username) {
        ProjectTask projectTask = findPTByProjectSequence(backlogId, ptId, username);

        projectTask = updatedTask;

        return projectTaskRepository.save(projectTask);
    }

    public void deletePTByProjectSequence(String backlog_id, String pt_id, String username) {
        ProjectTask projectTask = findPTByProjectSequence(backlog_id, pt_id, username);
        projectTaskRepository.delete(projectTask);
    }
}
